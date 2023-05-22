export interface ResponseDto<T> {
    isSuccess: boolean;
    result: T;
    errorMessages: string[];
}