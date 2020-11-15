import './styles.css';

const PhotoGallery = ({ photos }) => (
  <div className="photo-gallery-container">
    {
      photos.map(photo => (
        <div key={photo.id} className="photo-container">
          <a rel="noreferrer" target="_blank" href={photo.links.html}>
            <img
              alt={photo.alt_description}
              className="gallery-image"
              src={photo.urls.small}
            />
          </a>
        </div>
      ))
    }
  </div>
);

export default PhotoGallery;
