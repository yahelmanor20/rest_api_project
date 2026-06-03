function SortBar({onSortUpdate}) {
    const handleSortByLikes = async ()=>{
        onSortUpdate("likes")
        return;
    }
    const handleSortByCreationTime = async ()=>{
        onSortUpdate("date")
        return;
    }
    
    return(
        <div>
        <h3>מיין לפי:</h3>
        <br/>
        <button onClick={handleSortByLikes}>לייקים</button> | <button onClick={handleSortByCreationTime}>מהישן לחדש</button>
        </div>
    );
}

export default SortBar;