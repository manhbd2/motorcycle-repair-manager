import React, { forwardRef, useImperativeHandle } from "react";
import "../../styles/list.scss";
import Item from "../Item/Item";
import Guard from "components/Guard/Guard";
import { normalize, schema } from "normalizr";
const customersTemp = new schema.Entity("items");
const List = forwardRef((props, ref) => {
  const { product, fetching, isEmpty, selectedIds, onCheckBoxClick } = props;
  const { productSerives } = product;
  useImperativeHandle(ref, () => ({
    onCheckAll() {
      const { onCheckBoxListClick, selectedIds } = props;
      if (productSerives.length !== selectedIds.length) {
        const normalized = normalize(productSerives, [customersTemp]);
        const itemIds = normalized.result;
        onCheckBoxListClick(itemIds);
      } else {
        onCheckBoxListClick([]);
      }
    },
  }));
  if (isEmpty) return "";
  if (fetching) {
    return <Guard />;
  }
  return (
    <div className="order-list-container">
      {productSerives.length &&
        productSerives.map((productService, index) => {
          return (
            <Item
              key={productService.code}
              index={index}
              productService={productService}
              checked={selectedIds.includes(productService.id)}
              onCheckBoxClick={onCheckBoxClick}
            />
          );
        })}
    </div>
  );
});
export default List;
