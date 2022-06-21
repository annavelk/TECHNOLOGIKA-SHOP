import React from 'react';

// Компонент для отображения и перечеркивания старой цены, если она больше новой

function GetOldPrice(props) {
  if (props.oldPrice > props.price)
  {
    return (<div><font color="red"><del>Старая цена: {props.oldPrice}</del></font></div>)
  }

  return null;

}

export default GetOldPrice;
