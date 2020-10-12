import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { Entry } from '../types';
import AddEntryForm from './AddEntryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  error?: string;
  id: string;
  createdEntry: (data: Entry) => void
}

const AddPatientModal = ({ modalOpen, onClose, error, id, createdEntry }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddEntryForm id={id} submitted={createdEntry} />
    </Modal.Content>
  </Modal>
);

export default AddPatientModal;
