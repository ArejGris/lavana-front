import classes from './model.module.css'
const Model = ({note,setAlert}) => {
    return ( <div className={classes.container}>
        <div className={classes.background}></div>
        <div className={classes.note}>
            
        <p>{note}</p>
        <button onClick={()=>setAlert(null)}>ok</button>

        </div>


    </div> );
}
 
export default Model;