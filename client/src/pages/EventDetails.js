import React, { useEffect } from 'react';
import { Typography, List, Divider, Card } from 'antd';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Loading from '../components/Loading';
import { GET_EVENT, PARTICIPANT_SUBSCRIPTION } from '../queries';

const { Paragraph, Title, Text } = Typography;
export const EventDetails = () => {
    const { id } = useParams();
    const { loading, data, subscribeToMore } = useQuery(GET_EVENT, { variables: { id } });

    useEffect(() => {
        subscribeToMore({
            document: PARTICIPANT_SUBSCRIPTION,
            variables: {
                event_id: id
            },
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                return {
                    event: {
                        ...prev.event,
                        participants: [
                            subscriptionData.data.participantAdded,
                            ...prev.event.participants
                        ]
                    }
                };
            }
        });
    }, [id, subscribeToMore]);

    if (loading) return <Loading />;


    let { title, desc, date, from, to, user: { username }, participants } = data?.event;
    return (
        <>
            <Card title="Event Details">
                <Card type='inner' title="Title" >
                    <Title level={ 4 } >
                        { title }
                    </Title>
                </Card>
                <Card type="inner" title="Description">
                    <Paragraph>  { desc } </Paragraph>
                </Card>
                <Card type="inner" title="Creator" style={ styles.dateCard } >
                    { username }
                </Card>
                <Card type="inner" title="Date" style={ styles.dateCard } >
                    { new Date(date).toLocaleDateString() }
                </Card>
                <Card type="inner" title="From" style={ styles.dateCard } >
                    { from }
                </Card>
                <Card type="inner" title="To" style={ styles.dateCard } >
                    { to }
                </Card>
            </Card>
            <Divider>Participants</Divider>
            <List
                bordered
                dataSource={ participants }
                renderItem={ (item) =>
                    <List.Item>
                        <Text>{ item.user.username }</Text>
                    </List.Item> }
            />
        </>
    );
};
const styles = {
    dateCard: {
        marginTop: 10
    }
};