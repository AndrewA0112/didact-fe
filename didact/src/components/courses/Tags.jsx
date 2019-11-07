import React, { useState, useEffect } from 'react'
import { addTag, getTags, deleteTag } from '../../store/actions'
import { useSelector, useDispatch } from 'react-redux';
import { TagDelete, P } from '../dashboard/ButtonStyles';
import { TagInput, TagSelect } from './SelectStyles'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { ButtonDiv } from '../dashboard/ButtonStyles';

const useStyles = makeStyles(theme => ({
    card: {
        width: '100%',
        maxWidth: 600,
        minWidth: 220,
        borderRadius: 15,
        margin: '10px 0'
    },
    button: {
        boxShadow: 'none',
        borderRadius: '15px',
        background: '#EBE8E1',
        // marginLeft: '76.5%',

    },
    tagDisplay: {
        display: 'flex',
        flexFlow: 'row wrap',
    },
    pos: {
        marginBottom: 12,
    },
    input: {
        backgroundColor: '#F4F8FA',
        filter: "brightness(95%)",
        borderRadius: 15,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        margin: '3px',
        marginLeft: '10px',
        padding: '5px 10px',
        borderRadius: '10px',
        background: '#5B5B5B',
        color: 'white'
    },
    titleOrInstructorFields: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '45%',
        [`& fieldset`]: {
            borderRadius: 15,
        },
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        // margin: '10px',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

// const CssTextField = withStyles({
//     root: {
//         '& label.Mui-focused': {
//             color: 'gray',
//         },
//         '& .MuiOutlinedInput-root': {
//             '& fieldset': {
//                 borderColor: 'gray',
//             },
//             '&:hover fieldset': {
//                 borderColor: 'gray',
//             },
//             '&.Mui-focused fieldset': {
//                 border: '1px solid gray',
//             },

//         },
//     },
// })(TextField);

const Tags = ({ props, course }) => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const state = useSelector(state => state.tagsReducer)
    const allTags = state.tags
    const [openForm, setOpenForm] = useState(false)
    const [tag, setTag] = useState({
        tag: ''
    });

    useEffect(() => {
        dispatch(getTags())
    }, [dispatch])

    const handleChange = name => event => {
        setTag({ ...tag, [name]: event.target.value });

    };

    const handleClick = () => {
        setOpenForm(!openForm)
    }

    const handleSubmit = event => {
        event.preventDefault()
        dispatch(addTag(props.match.params.id, tag))
        setTag({ tag: '' })
    }

    const handleTagDelete = (tag) => {
        dispatch(deleteTag(props.match.params.id, tag))
    }

    const handleCancel = event => {
        event.preventDefault()
        setOpenForm(false)
    }

    return (
        <>
            <Card className={classes.card}>
                <CardContent className={classes.tagDisplay}>
                    {course.tags ? course.tags.map((tag, i) => {
                        return (
                            <div key={i + tag + 1}>
                                <div style={{ position: 'relative' }} key={i + tag + 2} className={classes.title}>
                                    <TagDelete key={i + tag + 3} onClick={() => handleTagDelete(tag)}><P key={i + tag + 4}>x</P></TagDelete><span key={i + tag + 5} style={{ paddingRight: '5px' }}>{tag}</span>
                                </div>

                            </div>

                        )
                    }) : null}
                   {!openForm ? <Button style={{ marginLeft: '81%' }} onClick={handleClick} type='submit' size="small" variant="contained" className={classes.button}>NEW TAG</Button> : null }
                </CardContent>

                {openForm ? (
                    <>
                        <form onSubmit={handleSubmit} className={classes.container} noValidate autoComplete="off">
                            {/* <CssTextField
                                id="standard-name"
                                list='tags'
                                label='Add Tag'
                                className={classes.titleOrInstructorFields}
                                value={tag.name}
                                onChange={handleChange('tag')}
                                margin="normal"
                                variant="outlined"
                                placeholder="Name"
                                InputProps={{ classes: { input: classes.input } }}
                            /> */}
                            <label for='tag-input' >Select an Existing Tag, or Create a New Tag
                            <TagInput id='tag-input' placeholder="Tag" value={tag.tag} onChange={handleChange('tag')} name="tag" list='tags' />
                            <TagSelect id='tags' style={{overflowY: "auto !important"}} onChange={handleChange('tag')}>
                                {allTags.map(el => {
                                    return (<option key={el.id} value={el.name} >{el.name}</option>)
                                })}
                            </TagSelect>
                            </label>
                            <ButtonDiv>
                                <Button style={{ marginLeft: '10px' }} onClick={handleCancel} size="small" variant="contained" className={classes.button} >CANCEL</Button>
                                <Button type='submit'  style={{ marginRight: '4%' }} size="small" variant="contained" className={classes.button} >Add Tag</Button>
                            </ButtonDiv>
                        </form>

                    </>
                ) : null}
            </Card>
        </>
    )
}

export default Tags;

