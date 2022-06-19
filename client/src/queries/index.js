import { gql } from "@apollo/client";

const eventFragment = gql`
fragment EventFragment on Event {
    id
    title
    desc
    date
    from
    to
    user{
      id
      username
      email
    }
   
    participants{
      id
      user_id
      user{
        id
        username
      }
    }
}
`;


export const GET_EVENTS = gql`
query getEvents {
    events{
    id
    title
    desc
    date
    }
}
`;

export const GET_EVENT = gql`
query getEvent($id:ID!){
  event(id:$id){
    ...EventFragment
  }
}
${eventFragment}
`;

export const EVENT_SUBSCRIPTION = gql`
subscription eventCreated {
  eventCreated {
    ...EventFragment
  }
}
${eventFragment}
`;

export const PARTICIPANT_SUBSCRIPTION = gql`
subscription participantAdded($event_id:ID) {
  participantAdded(event_id:$event_id){
    id
    user_id
    user{
      id
      username
      email
    }
  }
}
`;


export const GET_USERS = gql`
query getUsers {
  users {
    id
    username
  }
}
`;

export const GET_LOCATIONS = gql`
query getLocations {
  locations {
    id
    name
  }
}
`;

export const CREATE_EVENT = gql`
mutation addEvent( $data: CreateEventInput!) {
  createEvent(
    data: $data
  ) {
    id
  }
}
`;