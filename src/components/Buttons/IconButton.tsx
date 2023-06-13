import classNames from "classnames";
import { useEffect, useState } from "react";
import Icon from "../icon/Icon";
import { IconNames } from "../icon/icons";

interface IconButtonProperties {
  name: IconNames;
  size: number;
  viewBox: string;
  onClick?: () => void;
}

export const IconButton = ({
  name,
  size,
  viewBox,
  onClick,
}: IconButtonProperties) => {
  const [hover, setHover] = useState<boolean>(false);
  const [iconColor, setIconColor] = useState<string>("#fff");

  const backColor = hover ? "back-hover" : "back-hover-none";

  useEffect(() => {
    if (hover) {
      setIconColor("#3345ec");
    } else {
      setIconColor("#fff");
    }
  }, [hover]);

  return (
    <div
      className={classNames("icon-button", backColor)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      <Icon name={name} size={size} viewBox={viewBox} color={iconColor} />
    </div>
  );
};
