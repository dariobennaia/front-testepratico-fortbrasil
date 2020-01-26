import React from 'react';
import './style.css';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import api from '../../services/api';

class ShopsList extends React.Component {
  handleDeleteShop = async id => {
    await api.delete(`/shops/${id}`);
  };

  render() {
    const { shopSelected, shops = [] } = this.props;// eslint-disable-line
    const imageShopList =
      'https://cdn.icon-icons.com/icons2/606/PNG/512/shop-store-frontal-building_icon-icons.com_56118.png';

    return (
      <ul>
        {shops.map(shop => (
          <li key={shop._id} className="shop-item">
            <header>
              <img src={imageShopList} alt="Loja" />
              <div className="shop-info">
                <strong>{shop.name}</strong>
              </div>
              <div className="shop-actions">
                <button onClick={() => this.handleDeleteShop(shop._id)}>
                  <FaTrashAlt />
                </button>
                <button onClick={() => shopSelected(shop)}>
                  <FaEdit />
                </button>
              </div>
            </header>
            <p>{shop.about}</p>
          </li>
        ))}
      </ul>
    );
  }
}

export default ShopsList;
