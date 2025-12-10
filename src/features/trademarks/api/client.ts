import type { ZodType } from "zod";

export async function fetchWithSchema<T>(
  url: string,
  schema: ZodType<T>
): Promise<T> {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      const devMessage = `Request failed with status ${res.status}`;
      const userMessage =
        "데이터를 불러오는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.";
      throw new Error(import.meta.env.DEV ? devMessage : userMessage);
    }

    const json: unknown = await res.json();
    const parsed = schema.safeParse(json);

    if (!parsed.success) {
      if (import.meta.env.DEV) {
        console.error("Zod validation error:", parsed.error);
      }

      const devMessage = "Response schema validation failed";
      const userMessage =
        "데이터 형식이 올바르지 않습니다. 잠시 후 다시 시도해주세요.";

      throw new Error(import.meta.env.DEV ? devMessage : userMessage);
    }

    return parsed.data;
  } catch (err) {
    if (err instanceof Error) {
      const devMessage = `Fetch error: ${err.message}`;
      const userMessage =
        "네트워크 연결에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.";
      throw new Error(import.meta.env.DEV ? devMessage : userMessage);
    }

    throw new Error(
      "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
    );
  }
}
