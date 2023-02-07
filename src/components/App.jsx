import React, { useState, useEffect } from 'react';
import style from './App.module.css';
import SearchForm from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';

import { searchImages } from '../services/api';

const App = () => {
  const [items, setItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLarge] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (search) {
      const fetchImages = async () => {
        try {
          setLoading(true);
          const data = await searchImages(search, page);
          setItem(prevItems => [...prevItems, ...data.hits]);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchImages();
    }
  }, [search, page]);

  const onSearchImages = ({ search }) => {
    setSearch(search);
    setItem([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showImg = ({ largeImageURL, tags }) => {
    setLarge(largeImageURL);
    setTags(tags);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setLarge('');
    setTags('');
  };

  return (
    <div className={style.App}>
      <h1 className={style.title}>
        React homework "Gallery" by Anatoliia Riabchenko
      </h1>
      <SearchForm onSubmit={onSearchImages} />
      <ImageGallery items={items} showImg={showImg} />
      {error && <p>Error</p>}
      {loading && <Loader />}
      {Boolean(items.length) && <Button onClick={loadMore} />}
      {showModal && (
        <Modal onClose={closeModal}>
          <img src={largeImageURL} alt={tags}></img>
        </Modal>
      )}
    </div>
  );
};

export default App;
