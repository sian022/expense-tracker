import Modal from "../common/Modal";

const ExpensesForm = ({ open, onClose }) => {
  return (
    <Modal title="Add New Expense" open={open} onClose={onClose}>
      Hi, I am ExpensesForm
    </Modal>
  );
};

export default ExpensesForm;
