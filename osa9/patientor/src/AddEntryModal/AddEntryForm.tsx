import React, { FormEvent } from "react";
import axios from "axios";

import { Entry, EntryForSubmissionHC, HealthCheckRating } from "../types";
import { useStateValue } from "../state";
import { useField } from '../Hooks'
import { apiBaseUrl } from '../constants'
import { Dropdown, DropdownProps, Form } from "semantic-ui-react";

const AddEntryForm: React.FC<{id: string, submitted: (data: Entry) => void}> = ({ id, submitted }) => {
    const [{  diagnoses }, dispatch] = useStateValue();
    const [diags, setDiags] = React.useState<any>()
    const [value, setValue] = React.useState<any>()

    const desc = useField("text")
    const date = useField("date")
    const specialist = useField("text")
    const rating = useField("number")

    const select = (_event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
        setValue(data.value)
    }

    const formStyles = {
        div: {
            width: '100%'
        },
        input: {
            width: '60%',
            padding: '5px',
            marginBottom: '5px',
            display: 'inline-block',
            border: '1px solid grey',
            borderRadius: '5px'
        },
        label: {
            width: '30%',
            display: 'inline-block'
        }
    }

    React.useEffect(() => {
        
        let arr: any[] = []
        Object.keys(diagnoses).forEach(d => {
            arr.push({
                key: diagnoses[d].code,
                text: `${diagnoses[d].name} (${diagnoses[d].code})`,
                value: diagnoses[d].code
              });
        })
        setDiags(arr);
        console.log(arr)
    }, [diagnoses])    

    const submit = (event: FormEvent) => {
        event.preventDefault();
        
        const submission: EntryForSubmissionHC = {
            type: "HealthCheck",
            description: desc.value,
            date: date.value,
            specialist: specialist.value,
            diagnosisCodes: value,
            healthCheckRating: Number(rating.value) as HealthCheckRating
        }
        axios.post(apiBaseUrl + "/patients/" + id + "/entries", submission).then(res => {
            console.log(res)
            submitted(res.data)
        });
    }

    if(diags) {
        return(
        <>
            <form style={formStyles.div} onSubmit={submit}>
                <div>
                    Type: HealthCheck
                </div>
                <div>
                    <label style={formStyles.label} >
                        description:
                    </label>
                    <input style={formStyles.input} {...desc} />
                </div>
                <div>
                    <label style={formStyles.label} >
                        date:
                    </label>
                    <input style={formStyles.input} {...date} />
                </div>
                <div>
                    <label style={formStyles.label} >
                        specialist:
                    </label>
                    <input style={formStyles.input} {...specialist} />
                </div>
                <div>
                    <label style={formStyles.label} >
                        Rating:
                    </label>
                    <input style={formStyles.input} {...rating} />
                </div>
                <div>
                    <Form.Field>
                        <label>Diagnoses</label>
                        <Dropdown
                            fluid
                            multiple
                            search
                            selection
                            options={diags}
                            onChange={select}
                        />
                    </Form.Field>
                </div>
                <input type="submit" value="Save!" />
            </form>
        </>)
    } else {
        return (<></>)
    }
}

export default AddEntryForm