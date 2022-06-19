import { useRef } from 'react';
import { Button, Form, Input, Select, message, Typography } from 'antd';
import { useQuery, useMutation } from '@apollo/client';
import Loading from './Loading';
import { GET_USERS, GET_LOCATIONS, CREATE_EVENT } from '../queries';
const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;
export const CreateEvent = () => {
    const formRef = useRef();
    const { loading: usersLoading, data: usersData } = useQuery(GET_USERS);
    const { loading: locationsLoading, data: locationsData } = useQuery(GET_LOCATIONS);
    const [setEvent, { loading: eventLoading }] = useMutation(CREATE_EVENT);

    if (usersLoading || locationsLoading) return <Loading />;

    const onFinish = async (values) => {
        try {
            await setEvent({
                variables: {
                    data: values
                }
            });
            message.success("Event created");
            formRef.current.resetFields();

        } catch (error) {
            message.error("Event creation failed");
        }
    };


    return (
        <div style={ styles.outerContainer } >
            <Title level={ 4 } style={ { textAlign: 'center' } }>Create New Event</Title>
            <Form ref={ formRef } style={ styles.formContainer } name="createEvent" onFinish={ onFinish } layout="vertical" >
                <Form.Item
                    name="title"
                    label="Title"
                    rules={ [{ required: true, message: 'Please input a title!' }] }
                >
                    <Input disabled={ eventLoading } placeholder='Enter event title' />
                </Form.Item>

                <Form.Item
                    name="desc"
                    label="Description"
                    rules={ [{ required: true, message: 'Please input a description!' }] }
                >
                    <TextArea disabled={ eventLoading } placeholder='Enter event description' />
                </Form.Item>

                <Form.Item
                    name="date"
                    label="Event Date"
                    rules={ [{ required: true, message: 'Please input a date!' }] }
                >
                    <Input disabled={ eventLoading } placeholder='Enter date in the format yyyy-mm-dd' />
                </Form.Item>

                <Form.Item
                    name="from"
                    label="Start"
                    rules={ [{ required: true, message: 'Please input a event start time!' }] }
                >
                    <Input disabled={ eventLoading } placeholder='Enter event start time' />
                </Form.Item>

                <Form.Item
                    name="to"
                    label="Finish"
                    rules={ [{ required: true, message: 'Please input a event finish time!' }] }
                >
                    <Input disabled={ eventLoading } placeholder='Enter event finish time' />
                </Form.Item>

                <Form.Item
                    name="location_id"
                    label="Location"
                    rules={ [{ required: true, message: 'Please select a location!' }] }
                >
                    <Select disabled={ eventLoading }  >
                        { locationsData.locations.map(l => <Option key={ String(l.id) } > { l.name } </Option>) }
                    </Select>
                </Form.Item>

                <Form.Item
                    name="user_id"
                    label="User"
                    rules={ [{ required: true, message: 'Please select a user!' }] }
                >
                    <Select disabled={ eventLoading } >
                        { usersData.users.map(u => <Option key={ String(u.id) } > { u.username } </Option>) }
                    </Select>
                </Form.Item>


                <Form.Item >
                    <Button disabled={ eventLoading } loading={ eventLoading } type="primary" htmlType="submit">
                        Add Event
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

const styles = {
    outerContainer: {
        backgroundColor: "#eaecef",
        width: 500
    },
    formContainer: {
        padding: 24
    }
};