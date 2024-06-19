const  useStyle=()=>{
   const style={
    grid:{
        display:"grid",
        gridTemplateRow:'auto',
        gridTemplateColumns:'repeat(4,1fr)'
        
    },
    flex:{
      display:"flex",
      flexDirection:"column",
      justifyContents:"center",
      alignItems:"left"
    },
    card: {
        padding: '10px',
        border: '1px solid lightgray',
        maxWidth: '14rem',
        height: '20rem',
        display:' flex',
        flexDirection:' column',
        borderRadius: '5px 5px 0px 0px'
      },
      card2: {
        padding: '10px',
        border: '1px solid lightgray',
        maxWidth: '70%',
        height: '10rem',
        display:' flex',
        flexDirection:' row',
        borderRadius: '5px 5px 0px 0px'
      }
      ,
      img :{
        position: 'relative',
        height: '70%',
        width: '100%',
        overflow: 'hidden',
        display:"flex",
        alignItems: 'center',
    }
    ,
    img2 :{
      position: 'relative',
      height: '100%',
      paddingRight:"15px",
      overflow: 'hidden',
      alignItems: 'center',
  }
   }
   return {style}
}
export default useStyle