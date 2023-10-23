import { useEffect } from "react";

export default function useOnclickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      console.log(event);
      //!ref.current: ref가 가리키는 DOM 요소가 아직 설정되지 않았을 때 (즉, ref.current가 null 또는 undefined일 때) 조기 반환됩니다.
      // ref.current.contains(event.target): 클릭된 요소 (event.target)가 ref가 가리키는 DOM 요소 내부에 있는 경우에도 조기 반환됩니다. 이는 "외부 클릭"이 아닌 "내부 클릭"을 나타내기 때문입니다.
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler();
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, []);
}
