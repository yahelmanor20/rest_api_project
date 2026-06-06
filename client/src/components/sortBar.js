import "./sortBar.css";

function SortBar({onSortUpdate, currentSort}) {
    const handleSortByLikes = async ()=>{
        onSortUpdate("likes")
        return;
    }
    const handleSortByCreationTime = async ()=>{
        onSortUpdate("date")
        return;
    }

    return(
        <div className="sort-bar">
        <h3 className="sort-bar__title">מיין לפי:</h3>
        <div className="sort-bar__buttons">
            <button
                className={"sort-bar__btn" + (currentSort === "likes" ? " sort-bar__btn--active" : "")}
                onClick={handleSortByLikes}>לייקים</button>
            <button
                className={"sort-bar__btn" + (currentSort === "date" ? " sort-bar__btn--active" : "")}
                onClick={handleSortByCreationTime}>מהישן לחדש</button>
        </div>
        </div>
    );
}

export default SortBar;