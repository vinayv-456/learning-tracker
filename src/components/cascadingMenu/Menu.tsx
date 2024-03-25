import React from "react";
import { menuGroup } from "./constants";
import Index from "./src";
interface Props {}

function Menu(props: Props) {
  const {} = props;

  return (
    <Index
      isObject={true}
      groupby=""
      emptyRecordMsg="No items"
      selectionLimit={1}
      menuGroup={menuGroup}
      isMultiSelection={true}
      displayValue="value"
    />
  );
}

export default Menu;
