

export const ProgressBarPageName = ( {pageNameObj, step} ) => {
    
    if (pageNameObj.id === step) {
        return <>
            <h4 className="current-page-name">{pageNameObj.name}</h4>
        </>
    } else {
        return <>
            <h4 className="not-current-page-name">{pageNameObj.name}</h4>
        </>
    }
}