import React from "react";
import ciassNames from "classnames/bind";
import styles from "./CSSModule.module.css";

const cx = ciassNames.bind(styles); // 미러 styles에서 클래스를 받아 오도록 설정하고
const CSSModule = () => {
  return (
    <div className={cx("wrapper", "inverted")}>
      안녕하세요, 저는 <span className="something">CSS Module!</span>
    </div>
  );
};
export default CSSModule;
