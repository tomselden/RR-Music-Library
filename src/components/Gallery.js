import React, { Suspense } from "react";

function Gallery(props) {
  const GalleryItem = React.lazy(() => import("./GalleryItem"));

  const display = props.data.map((item, index) => {
    return (
      <Suspense fallback={<h1>Getting Music Data...</h1>}>
        <GalleryItem item={item} key={index} />
      </Suspense>
    );
  });

  return <div>{display}</div>;
}

export default Gallery;
