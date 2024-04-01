import axios from 'axios';
import { useEffect, useState } from 'react';
import { ScoopOption } from './ScoopOption';
import { Row } from 'react-bootstrap';
import { ToppingOption } from './ToppingOption';

const Options = ({ optionType }) => {
  //optionType é 'scoops' ou 'toppings'

  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        // TODO: handle error response
      });
  }, [optionType]);

  //TODO: replace 'null' with ToppingOption when available
  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;
  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <Row>{optionItems}</Row>;
};

export default Options;
