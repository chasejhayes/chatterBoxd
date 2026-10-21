const FormPopup = ({ showForm, onSubmit, newRating, setNewRating, newReview, setNewReview, formId }) => {

  if (!showForm) return null

    return (
      <div>
        <dialog open>
          <form id={`${formId}`} onSubmit={onSubmit}>
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

