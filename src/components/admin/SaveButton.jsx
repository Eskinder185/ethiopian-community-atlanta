export default function SaveButton({
  children = 'Save changes',
  savingText = 'Saving…',
  loading = false,
  saving = false,
  disabled = false,
  ...props
}) {
  const isSaving = loading || saving

  return (
    <button
      type="submit"
      disabled={disabled || isSaving}
      className="btn btn-primary btn-sm disabled:cursor-not-allowed disabled:opacity-60"
      {...props}
    >
      {isSaving ? savingText : children}
    </button>
  )
}
