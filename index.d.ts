declare module "use-async-react" {
  export default function<T extends any[], U>(
    promise: (...args: T) => Promise<U>
  ): {
    call: (...args: T) => void;
    result?: U;
    loading: boolean;
    error?: any;
  };
}
