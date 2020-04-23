import React, { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {connect} from "react-redux"
import {addComment, getComment} from "../redux/commentAction"

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
  },
});

 function ImgMediaCard(props) {
  const classes = useStyles();
  const [comment,setComment] = useState('')
  const addComment = async () =>{
     const url = "http://127.0.0.1:5000/blogs/comments/"+props.data.id
     const token = props.token
     const payload = {
       "comment":comment
    }
    await props.addComment(url,payload,token)
    getComments()
    setComment('')
  }

  const getComments = () =>{
    const url = "http://127.0.0.1:5000/blogs/comments/"+props.data.id
    props.getComment(url)
  }
  var blogComments = props.comments.filter(ele=>ele.blog_id === props.data.id)

  return (
    <Card className={classes.root}  key={props.data.id}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="loading"
          height="140"
          // image=""
          image="nothing"
          title="profile"
        />
        <CardContent>
          <Typography gutterBottom >
          Title :{props.data.title}
          </Typography>
          <Typography gutterBottom >
           category : {props.data.category}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.data.content}
          </Typography>
        </CardContent>
        
      </CardActionArea>
      <CardActions>
        <div size="small" color="primary">
          {props.data.created_on}
        </div>
        <div size="small" color="primary">
          creator:{props.data.user_name}
        </div>
      </CardActions>
      <p><b>Comments</b></p>
      {blogComments.map(ele=>{
        return (
          <CardActions>
        <div size="small" color="primary">
          {ele.comment}
        </div>
        <div size="small" color="primary">
          ----{ele.name}
        </div>
      </CardActions>
        )
      })}
      <CardActions>
        <textarea placeholder="add your comments" value={comment} onChange={(e)=>setComment(e.target.value)} />
      </CardActions>
      <CardActions>
        <Button size="small" color="primary"  onClick ={()=>addComment()} >
          submit
        </Button>
        <Button size="small" color="primary" onClick={()=>getComments()}>
          Read all Comments
        </Button>
      </CardActions>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  ...state,
  token:state.commonReducer.token,
  comments:state.commentReducer.comments
})

const mapDispatchToProps = dispatch => ({
  getComment:(url)=>dispatch(getComment(url)),
  addComment:(url,payload,token)=>dispatch(addComment(url,payload,token))
})


export default connect (mapStateToProps,mapDispatchToProps) (ImgMediaCard)