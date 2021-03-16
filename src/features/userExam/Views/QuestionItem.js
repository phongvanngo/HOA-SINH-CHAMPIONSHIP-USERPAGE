import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useDispatch } from 'react-redux';
import { choseAnswer, openImageDialog } from './../UserExamSlice';
import './QuestionItem.scss';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        marginBottom: '20px',
        backgroundColor: 'white'
    },
}));

export default function QuestionItem({ detailedQuestion }) {
    const { questionId, content, index, image, listAnswers } = detailedQuestion;
    const dispatch = useDispatch();
    const classes = useStyles();

    const [userAnswer, setUserAnswer] = React.useState(null);

    const handleChange = (event) => {
        setUserAnswer(event.target.value);
        dispatch(choseAnswer({ id: questionId, ans: event.target.value }));
    };

    return (
        <div className='question-item-container'>
            <Paper className={classes.paper}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span><i className="far fa-dot-circle"></i>{` Câu hỏi ${index}`}</span>
                </div>
                <div style={{ marginTop: '10px' }}>
                    <span>Q. </span>
                    <span>{content}</span>
                </div>
                <div className="image-area">
                    {image ? <img src={image} alt="hinhanh" onClick={() => { dispatch(openImageDialog(image)) }} /> : ''}
                </div>
                <div className="question-divider">
                    <div className="divider-text">Phần trả lời: </div>
                </div>
                <div className="answers-area">
                    <RadioGroup aria-label="gender" name="gender1" value={userAnswer} onChange={handleChange}>
                        {
                            listAnswers.map((element, index) => {
                                return (<FormControlLabel key={index} value={element.ans} control={<Radio />} label={element.content} />)
                            })
                        }
                    </RadioGroup>
                </div>

            </Paper>
        </div>
    )
}
