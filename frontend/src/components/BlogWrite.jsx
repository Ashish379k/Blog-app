import React,{useEffect,useState} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {connect} from "react-redux"
import { Redirect } from 'react-router-dom';
import {getCategory,addCategory} from "../redux/CategoryAction"
import {addBlog} from "../redux/BlogAction"

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 18,
    fontWeight:"bold",
    textAlign:"center"
  },
  pos: {
    marginBottom: 12,
  },
});

 const BlogWrite =  (props) => {
  const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;
  const [category,setCategory] = useState("")

  const [category_id, setCatId] = useState('')
  const [title , setTitle] = useState('')
  const [content , setContent] = useState('')

  const handleSubmit = async ()=>{
  const url ="http://127.0.0.1:5000/auth/categories"
  await props.addCategory(url,{category})
   props.getCategory(url)
  }

  const postData = () => {
    const url = "http://127.0.0.1:5000/auth/blogs"
    const token = props.token
    const payload = {
      category_id:category_id,
      title:title,
      content:content,
      imgurl:""
    }

    props.addBlog(url,payload,token)
    setCatId('')
    setContent('')
    setTitle('')
  }


  useEffect(()=>{
    const url ="http://127.0.0.1:5000/auth/categories"
    props.getCategory(url)
  },[])

  if(props.token){
  return (
      <div>
        <div className="container mx-auto my-4">
            <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                 Write your blog here.
                </Typography>
                <select className="form-control" onChange={(e)=>setCatId(e.target.value)}>
                  <option disabled selected>Select your category</option>
                  {props.category.map(ele=>(<option value={ele.id}>{ele.category}</option>))}
                
                </select>
                <div className="row">
                <input placeholder="Add new Categories" onChange={(e)=>setCategory(e.target.value)} className="col-3 form-control mx-3 my-auto"/>
                <button onClick={()=>handleSubmit()} className="btn btn-secondary col-2">Add</button>
                </div>

               <input className="form-control my-4" onChange={(e)=>{setTitle(e.target.value)}} value={title} placeholder="add title for your blog"/>
                <Typography className={classes.title} color="textSecondary">
                Content
                </Typography>
                <textarea type="text" className="form-control" onChange={(e)=>setContent(e.target.value)} value={content} style={{height:"200px"}}/>
            </CardContent>
            <CardActions className="justify-content-center">
                <Button size="small" className="btn btn-success" onClick={()=>postData()} >Post</Button>
            </CardActions>
            </Card>
        </div>  
    </div>     
  );
  }
  else{
    return (<Redirect to="/auth/login" />)
  }
}

const mapStateToProps = (state) => ({
    ...state,
    token:state.commonReducer.token,
    user:state.commonReducer.user,
    category:state.categoryReducer.category,
})

const mapDispatchToProps = dispatch => ({
    getCategory:(url)=>dispatch(getCategory(url)),
    addCategory : (url,payload) =>dispatch(addCategory(url,payload)),
    addBlog : (url,payload,token) =>dispatch(addBlog(url,payload,token))
})

export default connect (mapStateToProps,mapDispatchToProps)(BlogWrite)