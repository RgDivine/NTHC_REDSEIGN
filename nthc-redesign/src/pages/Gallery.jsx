import { useState } from 'react';
import { api } from '../lib/api.js';
import { useApi } from '../lib/useApi.js';
import PageHeader from '../components/PageHeader.jsx';
import Photo from '../components/Photo.jsx';
import Dialog from '../components/Dialog.jsx';
import { SnapshotNotice, Loading, EmptyState } from '../components/Status.jsx';

function AlbumViewer({ album }) {
  const photos = useApi(() => api.galleryGroup(album.group), [album.group]);
  const [index, setIndex] = useState(0);
  const count = photos.data.length;

  if (photos.loading) return <Loading label="Loading photos…" />;
  if (count === 0) return <p>The photos in this album could not be loaded.</p>;

  const step = (offset) => setIndex((index + offset + count) % count);
  return (
    <div>
      <div className="viewer__image"><Photo src={photos.data[index].image} alt={`${album.description}, photo ${index + 1}`} /></div>
      <div className="viewer__controls">
        <button type="button" className="button button--outline button--small" onClick={() => step(-1)}>Previous</button>
        <span aria-live="polite">{index + 1} of {count}</span>
        <button type="button" className="button button--outline button--small" onClick={() => step(1)}>Next</button>
      </div>
    </div>
  );
}

export default function Gallery() {
  const albums = useApi(() => api.gallery());
  const [openAlbum, setOpenAlbum] = useState(null);

  return (
    <>
      <PageHeader title="Gallery" intro="Photographs from NTHC events and activities." trail={[{ label: 'About', to: 'about' }]} />
      <section className="section">
        <div className="container">
          <SnapshotNotice source={albums.source} />
          {albums.loading && <Loading label="Loading albums…" />}
          {!albums.loading && albums.data.length === 0 && (
            <EmptyState title="No albums are available right now"><p>Please check back later.</p></EmptyState>
          )}
          <div className="albums">
            {albums.data.map((album) => (
              <button key={album.group} type="button" className="album" onClick={() => setOpenAlbum(album)}>
                <div className="album__cover"><Photo src={album.image} alt="" caption={album.description} /></div>
                <span>{album.description}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
      <Dialog open={Boolean(openAlbum)} title={openAlbum?.description} onClose={() => setOpenAlbum(null)}>
        {openAlbum && <AlbumViewer album={openAlbum} />}
      </Dialog>
    </>
  );
}
