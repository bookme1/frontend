"use client";
import { Icon } from "../Icon";
import styles from "./Card.module.css";

interface IBook {
  id: number;
  title: string;
  url: string;
  price: number;
  author: string;
}

const Card = ({ book }: { book: IBook }) => {
  const { title, url, price, author, id } = book;

  return (
    <article className={styles.cardContainer}>
      <figure
        className={styles.imageContainer}
        style={{ backgroundImage: `url(${url})` }}
      >
        <a
          href={`book/${id}`}
          aria-label={`Read more about ${title}`}
          className={styles.cardLink}
        ></a>
      </figure>
      <section className={styles.descriptionContainer}>
        <h2 className={styles.title}>
          <a href={`book/${id}`} className={styles.cardLink}>
            {title}
          </a>
        </h2>
        <p className={styles.authors}>{author}</p>
        <div className={styles.bottomContainer}>
          <p className={styles.price}>{price} ₴</p>
          <div className={styles.controls}>
            <button
              className={styles.heartButton}
              aria-label="Add to favorites"
            >
              <Icon name="heart" size={24} />
            </button>
            <button className={styles.cartButton} aria-label="Add to cart">
              <Icon name="cart" size={24} color="white" />
            </button>
          </div>
        </div>
      </section>
    </article>
  );
};

export default Card;
