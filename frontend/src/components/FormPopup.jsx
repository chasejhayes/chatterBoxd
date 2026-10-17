const FormPopup = ({ showForm, onSubmit, newRating, setNewRating, newReview, setNewReview }) => {
  if (showForm === true)
    return (
      <div>
        <dialog open>
          <form method="dialog" id="user_review" onSubmit={onSubmit}>
            <label>Review:
              <input value={newReview} onChange={(e) => setNewReview(e.target.value)} />
            </label>
            <label>Rating:
              <input value={newRating} onChange={(e) => setNewRating(e.target.value)} />
            </label>
            <button>Submit</button>
          </form>
        </dialog>
      </div>

    )
}

export default FormPopup
