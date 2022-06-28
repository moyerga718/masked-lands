import { LibraryFilters } from "./LibraryFilters"
import { PublicLibrary } from "./PublicLibrary"
import "./PublicLibraryContainer.css"

export const PublicLibraryContainer = () => {
    return <>
        <section className="public-library-container">
            <div className="library-filters-div">
                <LibraryFilters />
            </div>
            <div className="library-div">
                <PublicLibrary />
            </div>
        </section>
    </>
}