
import React, { forwardRef, useImperativeHandle, useEffect } from 'react';
import "../../styles/list.scss";
import Item from "../Item/Item";

import Guard from 'components/Guard/Guard'
import { normalize, schema } from 'normalizr';
const customersTemp = new schema.Entity('items');

const List = forwardRef((props, ref) => {
  const { customer, fetching, isEmpty, onCheckBoxClick, onCheckBoxListClick, selectedIds } = props;
  const { customers } = customer;

  useEffect(() => {
    if (fetching) onCheckBoxListClick([]);
  }, [fetching])

  useImperativeHandle(ref, () => ({
    onCheckAll() {
      if (customers.length !== selectedIds.length) {
        const normalized = normalize(customers, [customersTemp]);
        const itemIds = normalized.result;
        onCheckBoxListClick(itemIds);
      } else {
        onCheckBoxListClick([]);
      }
    },
  }));

  if (isEmpty) return '';
  if (fetching) {
    return (
      <Guard />
    );
  }
  return (
    <div className="order-list-container">
      {customers.map((customer) => {
        return <Item
              key={customer.code}
              index={customer.code}
              customer={customer}
              checked={selectedIds.includes(customer.id)}
              onCheckBoxClick={onCheckBoxClick}
          />;
      })}
    </div>
  );
});
List.defaultProps = {
  customers: [],
};
export default List;
