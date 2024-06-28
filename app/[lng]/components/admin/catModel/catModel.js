import classes from "./catmodel.module.css";
const CatModel = ({ setOpen, id,getData}) => {
  function cancel() {
    setOpen(false);
  }
  async function deleteP(id) {
    const res = await fetch(
      "http://localhost:5000/admin/delete-category/" + id,
      {
        method: "DELETE",
        mode: "cors",
      }
    );
    const data = await res.json();
    console.log(data, "delete");
    if (data.status == 200) {
     await getData();
     
    }
    setOpen(false)
  }
  return (
    <div className={classes.delete}>
      <div className={classes.background}></div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          deleteP(id);
        }}
        className={classes.cat}
      >
        <div className={classes.formGroup}>
          <label htmlFor="">Do you want really to delete the category</label>
          <div className={classes.actions}>
            <button className={classes.btn2}>Delete</button>
            <button className={classes.btn} type="button" onClick={cancel}>
              cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CatModel;
