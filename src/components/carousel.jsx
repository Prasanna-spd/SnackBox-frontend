import React from "react";

export default function carousel() {
  return (
    <div>
      <div id="carouselExample" class="carousel slide">
        <div
          class="carousel-inner"
          id="carousel-size"
          style={{
            objectFit: "contain",
          }}
        >
          <div
            class="carousel-caption d-none d-md-block"
            style={{ zIndex: "10" }}
          >
            <form class="d-flex" role="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                class="btn btn-outline-success bg-success text-white"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
          <div class="carousel-item active">
            <img
              src="https://source.unsplash.com/random/?burger"
              class="d-block w-100"
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://source.unsplash.com/random/?pizza"
              class="d-block w-100"
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://source.unsplash.com/random/?biryani"
              class="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

// style={{ objectFit: "contain !important" }}
//spd@#$prasanna
//spd1234prasanna
