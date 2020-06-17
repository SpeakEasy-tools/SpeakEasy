import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { encodeImageFileAsURL, Theme } from "../../../utils";
import clsx from "clsx";
import {
    DeleteConfig,
    GetConfigs,
    InsertConfig,
    UpdateConfig
} from "../../../Queries";
import Typography from "@material-ui/core/Typography";
import { Add, Check, Clear, Delete, Edit } from "@material-ui/icons";
import { TextField } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import JSONEditor from "jsoneditor";
import { DropzoneArea } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    root: {
        width: "auto",
        height: "90%"
    },
    content: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexFlow: "row noWrap"
    },
    column: {
        height: "100%",
        display: "flex",
        flexFlow: "column noWrap"
    },
    row: {
        width: "100%",
        display: "flex",
        alignItems: "center"
    },
    pad: {
        padding: theme.spacing(1)
    },
    button: {
        "&:disabled": {
            backgroundColor: theme.palette.error.main
        }
    },
    json: {
        width: 400
    }
}));

function ConfigsPanel({ moduleId }) {
    const classes = useStyles(Theme);

    const [configs] = GetConfigs(moduleId);
    const [configId, setConfigId] = useState(null);

    const [tabIndex, setTabIndex] = useState(0);

    const [newName, setNewName] = useState("");

    const [insertName, setInsertName] = useState(null);
    const [insertConfig, setInsertConfig] = useState(null);

    const [deleteId, setDeleteId] = useState(null);

    const rowsInserted = InsertConfig(moduleId, insertName, insertConfig);
    const rowsDeleted = DeleteConfig(deleteId);

    const [edit, setEdit] = useState(false);
    const [editName, setEditName] = useState(null);
    const [editConfig, setEditConfig] = useState(null);

    const [container, setContainer] = useState(null);

    const [jsonEditor, setJsonEditor] = useState(null);

    const rowsEdited = UpdateConfig(configId, editName, editConfig);

    const [files, setFiles] = useState([]);
    const [dropZoneKey, setDropZoneKey] = useState(0);

    const handleFileChange = fs => {
        if (!fs.length) return;
        Promise.all(fs.map(f => encodeImageFileAsURL(f))).then(values => {
            setFiles([...values]);
        });
    };
    const handleTabChange = (e, v) => {
        setTabIndex(v);
    };
    const handleDelete = lId => {
        if (
            window.confirm(
                "Are you sure you want to delete this configuration?"
            )
        ) {
            setDeleteId(lId);
        }
    };
    const handleAdd = () => {
        setInsertConfig({ ...jsonEditor.get(), files: files });
        setInsertName(newName);
    };
    const handleClear = () => {
        setDropZoneKey(prevState => prevState + 1);
        setNewName("");
        setInsertName(null);
        setInsertConfig(null);
        setFiles([]);
    };
    const handleCancel = () => {
        setNewName("");
        setEditName(null);
        setEditConfig(null);
        setEdit(false);
        setFiles([]);
    };
    const handleEdit = () => {
        if (newName.length) {
            setEditName(newName);
        } else {
            setEditName(configs[tabIndex].name);
        }
        setEditConfig({ ...jsonEditor.get(), files: files });
    };

    useEffect(() => {
        if (!jsonEditor) return;
        if (!(configs && configs.length > tabIndex)) {
            setConfigId(null);
            jsonEditor.set({});
            handleClear();
            handleCancel();
            return;
        }
        let parsed = JSON.parse(configs[tabIndex]["config"]);
        setFiles([...parsed["files"]]);
        setDropZoneKey(prevState => prevState + 1);
        delete parsed["files"];
        setConfigId(configs[tabIndex].id);
        jsonEditor.set(parsed);
    }, [configs, tabIndex, jsonEditor]);
    useEffect(() => {
        if (!rowsDeleted) return;
        window.location.reload();
    }, [rowsDeleted]);
    useEffect(() => {
        if (!rowsInserted) return;
        window.location.reload();
    }, [rowsInserted]);
    useEffect(() => {
        if (!rowsEdited) return;
        window.location.reload();
    }, [rowsEdited]);
    useEffect(() => {
        if (!container) return;
        setJsonEditor(new JSONEditor(container, { mode: "text" }));
    }, [container]);

    return (
        <div className={clsx(classes.content)}>
            <div
                className={clsx(classes.column)}
                style={{
                    backgroundColor: Theme.palette.secondary.light,
                    color: Theme.palette.secondary.contrastText
                }}
            >
                <div
                    className={clsx(classes.row)}
                    style={{
                        borderLeft: `1px solid ${Theme.palette.secondary.contrastText}`
                    }}
                >
                    <div className={clsx(classes.pad)}>
                        <Typography variant="h4" color="primary">
                            Configurations
                        </Typography>
                    </div>
                </div>
                <Tabs
                    value={tabIndex}
                    onChange={handleTabChange}
                    variant="scrollable"
                    orientation="vertical"
                    style={{
                        borderLeft: `1px solid ${Theme.palette.secondary.contrastText}`
                    }}
                >
                    {configs &&
                        configs.map(c => (
                            <Tab
                                key={c.id}
                                label={
                                    edit && c.id === configs[tabIndex].id ? (
                                        <TextField
                                            required
                                            label="Edit Config Name"
                                            placeholder="Config Name"
                                            defaultValue={c.name}
                                            onChange={e =>
                                                setNewName(e.target.value)
                                            }
                                        />
                                    ) : (
                                        c.name
                                    )
                                }
                                style={{
                                    color: Theme.palette.primary.main,
                                    borderTop: `1px solid ${Theme.palette.secondary.contrastText}`
                                }}
                            />
                        ))}
                    <Tab
                        style={{
                            borderTop: `1px solid ${Theme.palette.secondary.contrastText}`
                        }}
                        label={
                            configs && configs.length <= tabIndex ? (
                                <TextField
                                    required
                                    label="Add Config"
                                    placeholder="Config Name"
                                    value={newName}
                                    onChange={e => setNewName(e.target.value)}
                                />
                            ) : (
                                <div className={clsx(classes.row)}>
                                    <div style={{ flex: "1 1 auto" }}>
                                        Add Config
                                    </div>
                                    <div style={{ flex: "1 1 auto" }}>
                                        <Add
                                            style={{
                                                color:
                                                    Theme.palette.primary.main
                                            }}
                                        />
                                    </div>
                                </div>
                            )
                        }
                    />
                </Tabs>
            </div>
            <div className={clsx(classes.column)}>
                <div className={clsx(classes.row)}>
                    <div className={clsx(classes.pad)}>
                        <Typography paragraph style={{ width: 200 }}>
                            Module configurations have no pre-defined schema,
                            the only rule is that they must be valid JSON. Use
                            the JSON editor to add a configuration.
                        </Typography>
                    </div>
                    <div className={clsx(classes.pad)}>
                        <div
                            className={clsx(classes.json)}
                            ref={elem => setContainer(elem)}
                        />
                    </div>
                </div>
                <div className={clsx(classes.row)}>
                    <div className={clsx(classes.pad)}>
                        <Typography paragraph style={{ width: 200 }}>
                            Files such as .mp3, .jpg, and .pdf can be included
                            in the configuration by dragging and dropping them
                            to the drop-zone.
                        </Typography>
                    </div>
                    <div className={clsx(classes.pad)}>
                        <DropzoneArea
                            key={dropZoneKey}
                            onChange={handleFileChange}
                            dropzoneText="Drag and drop files here or click to upload"
                            showFileNames
                            filesLimit={5}
                            initialFiles={files}
                        />
                    </div>
                </div>
                <div
                    className={clsx(classes.row)}
                    style={{ justifyContent: "center" }}
                >
                    {configs && configs.length <= tabIndex ? (
                        <>
                            <div className={clsx(classes.pad)}>
                                <Button
                                    className={clsx(classes.button)}
                                    disabled={!newName}
                                    onClick={handleAdd}
                                    style={{
                                        color: Theme.palette.secondary.main
                                    }}
                                >
                                    <div className={clsx(classes.row)}>
                                        <div className={clsx(classes.pad)}>
                                            <Check />
                                        </div>
                                        <div className={clsx(classes.pad)}>
                                            Confirm
                                        </div>
                                    </div>
                                </Button>
                            </div>
                            <div className={clsx(classes.pad)}>
                                <Button
                                    onClick={handleClear}
                                    style={{
                                        color: Theme.palette.secondary.main
                                    }}
                                >
                                    <div className={clsx(classes.row)}>
                                        <div className={clsx(classes.pad)}>
                                            <Clear />
                                        </div>
                                        <div className={clsx(classes.pad)}>
                                            Cancel
                                        </div>
                                    </div>
                                </Button>
                            </div>
                        </>
                    ) : edit ? (
                        <>
                            <div className={clsx(classes.pad)}>
                                <Button
                                    onClick={handleEdit}
                                    style={{
                                        color: Theme.palette.secondary.main
                                    }}
                                >
                                    <div className={clsx(classes.row)}>
                                        <div className={clsx(classes.pad)}>
                                            <Check />
                                        </div>
                                        <div className={clsx(classes.pad)}>
                                            Confirm
                                        </div>
                                    </div>
                                </Button>
                            </div>
                            <div className={clsx(classes.pad)}>
                                <Button
                                    onClick={handleCancel}
                                    style={{
                                        color: Theme.palette.secondary.main
                                    }}
                                >
                                    <div className={clsx(classes.row)}>
                                        <div className={clsx(classes.pad)}>
                                            <Clear />
                                        </div>
                                        <div className={clsx(classes.pad)}>
                                            Cancel
                                        </div>
                                    </div>
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={clsx(classes.pad)}>
                                <Button onClick={() => setEdit(true)}>
                                    <div className={clsx(classes.row)}>
                                        <div className={clsx(classes.pad)}>
                                            <Edit />
                                        </div>
                                    </div>
                                    <div className={clsx(classes.pad)}>
                                        Edit
                                    </div>
                                </Button>
                            </div>
                            <div className={clsx(classes.pad)}>
                                <Button
                                    onClick={() =>
                                        handleDelete(configs[tabIndex].id)
                                    }
                                >
                                    <div className={clsx(classes.row)}>
                                        <Delete />
                                    </div>
                                    <div className={clsx(classes.pad)}>
                                        Delete
                                    </div>
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

ConfigsPanel.displayName = "ConfigsPanel";
ConfigsPanel.propTypes = {
    moduleId: PropTypes.any,
    moduleName: PropTypes.any
};
export default ConfigsPanel;
