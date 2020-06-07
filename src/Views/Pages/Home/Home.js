import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../../utils";
import clsx from "clsx";
import {HOME} from '../../../Routes/Routes';
import TextField from "@material-ui/core/TextField";
import {Search} from "@material-ui/icons";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {listLanguages, translate} from "../../../CloudFunctions/Translate";
import IconButton from "@material-ui/core/IconButton";
import {synthesizeSpeech} from "../../../CloudFunctions/TextToSpeech";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
    },
    content: {
        padding: theme.spacing(1),
        flex: '1 1 100%',
        height: '100%',
        display: 'flex',
        flexFlow: 'column noWrap',
    },
    row: {
        width: '100%',
        display: 'flex',
    },
    pad: {
        padding: theme.spacing(1),
    },
    input: {
        color: theme.palette.secondary.contrastText
    }
}));

export default () => {
    document.title = HOME.name;
    const classes = useStyles(Theme);

    const [search, setSearch] = useState();

    const [languages, setLanguages] = useState([]);
    const [language, setLanguage] = useState();

    const [translation, setTranslation] = useState('');

    const [audioUrl, setAudioUrl] = useState();

    const handleSearchChange = e => setSearch(e.target.value);
    const handleLanguageChange = (e, val) => setLanguage(val);
    const handleSearch = () => translate(search, language.code)
        .then(setTranslation);

    useEffect(() => {
        listLanguages().then(setLanguages);
    }, []);
    useEffect(() => {
        if(!(translation && (typeof translation === 'string') && language && language.code)) return;
        synthesizeSpeech(translation, language.code).then(setAudioUrl)
    }, [translation, language]);
    useEffect(() => {
        if(!audioUrl) return;
        console.log(audioUrl);
    }, [audioUrl]);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <TextField
                        label='Search dictionary'
                        placeholder='Search dictionary'
                        variant='outlined'
                        onChange={handleSearchChange}
                    />
                </div>
                <div className={clsx(classes.pad)}>
                    <Autocomplete
                        id='language_select'
                        freeSolo
                        options={languages}
                        getOptionLabel={option => option.name}
                        onChange={handleLanguageChange}
                        style={{width: 200}}
                        renderInput={params => <TextField {...params} placeholder='Translate to'
                                                          label='Translation Language' variant='outlined'/>}
                    />
                </div>
                <div className={clsx(classes.pad)}>
                    <IconButton
                        onClick={handleSearch}
                    >
                        <Search/>
                    </IconButton>
                </div>
            </div>
            {translation && (
                <div className={clsx(classes.row)}>
                    <div className={clsx(classes.pad)}>
                        <TextField
                            label='Translation'
                            placeholder='Translation'
                            variant='outlined'
                            value={translation}
                        />
                    </div>
                    {audioUrl && (
                        <audio controls src={audioUrl}/>
                    )}
                </div>
            )}
        </div>
    )
}