import { useEffect, useState } from 'react'
import FormInput from '../../components/admin/FormInput'
import FormTextarea from '../../components/admin/FormTextarea'
import FormSelect from '../../components/admin/FormSelect'
import SaveButton from '../../components/admin/SaveButton'
import ImageUpload from '../../components/admin/ImageUpload'
import StatusBadge from '../../components/admin/StatusBadge'
import { getMediaGalleryUploadFolder, isLinkBasedMediaType, uploadFolders } from '../../config/assets'
import EditorContentTabs from '../../components/admin/EditorContentTabs'
import AdminSetupNotice from '../../components/admin/AdminSetupNotice'
import { useAdminLanguage } from '../../context/AdminLanguageContext'
import {
  MEDIA_TYPES,
  deleteMediaItem,
  fetchMediaItemsAdminState,
  normalizeMediaItem,
  saveMediaItem,
} from '../../utils/mediaItems'
import { buildMediaContentAmFromDraft, mediaItemToDraft } from '../../utils/mediaLocale'
import { hasSupabaseConfig } from '../../lib/supabaseClient'
import { isValidUuid } from '../../utils/uuid'

const TYPE_OPTIONS = [
  { value: MEDIA_TYPES.IMAGE, labelKey: 'media.typeImage' },
  { value: MEDIA_TYPES.GIF, labelKey: 'media.typeGif' },
  { value: MEDIA_TYPES.YOUTUBE, labelKey: 'media.typeYoutube' },
  { value: MEDIA_TYPES.VIDEO_LINK, labelKey: 'media.typeVideoLink' },
  { value: MEDIA_TYPES.EVENTBRITE, labelKey: 'media.typeEventbrite' },
  { value: MEDIA_TYPES.GOOGLE_FORM, labelKey: 'media.typeGoogleForm' },
  { value: MEDIA_TYPES.PARTIFUL, labelKey: 'media.typePartiful' },
  { value: MEDIA_TYPES.DOCUMENT, labelKey: 'media.typeDocument' },
  { value: MEDIA_TYPES.EXTERNAL_LINK, labelKey: 'media.typeExternalLink' },
]

function ToggleField({ id, label, checked, onChange }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center gap-3 rounded-lg border border-ecaa-border/80 bg-ecaa-cream/40 px-4 py-3">
      <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4" />
      <span className="text-sm font-medium text-ecaa-ink">{label}</span>
    </label>
  )
}

export default function AdminMedia() {
  const { adminT } = useAdminLanguage()
  const [items, setItems] = useState([])
  const [draft, setDraft] = useState(null)
  const [editorLang, setEditorLang] = useState('en')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [setupMessage, setSetupMessage] = useState('')

  useEffect(() => {
    fetchMediaItemsAdminState().then((result) => {
      setItems(result.items)
      setSetupMessage(result.setupMessage || '')
      setLoading(false)
    })
  }, [])

  const startNew = () => {
    setDraft({
      ...normalizeMediaItem({
        id: `local-media-${Date.now()}`,
        localOnly: true,
        title: '',
        type: MEDIA_TYPES.IMAGE,
        visible: true,
        featured: false,
        display_order: 999,
        related_event_id: null,
      }),
      content_am: {
        title: '',
        caption: '',
        alt_text: '',
        category: '',
        button_label: '',
      },
    })
    setEditorLang('en')
    setMessage('')
    setError('')
  }

  const startEdit = (item) => {
    setDraft(mediaItemToDraft(item))
    setEditorLang('en')
    setMessage('')
    setError('')
  }

  const updateDraft = (field, value) => setDraft((current) => ({ ...current, [field]: value }))

  const updateContentAm = (field, value) => {
    setDraft((current) => ({
      ...current,
      content_am: { ...(current.content_am || {}), [field]: value },
    }))
  }

  const handleSave = async (event) => {
    event.preventDefault()
    if (!draft) return
    setSaving(true)
    setMessage('')
    setError('')

    try {
      if (!hasSupabaseConfig()) {
        throw new Error(
          'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to save media online.',
        )
      }
      const saved = await saveMediaItem({
        ...draft,
        content_am: buildMediaContentAmFromDraft(draft),
      })
      const refreshed = await fetchMediaItemsAdminState()
      setItems(refreshed.items)
      setSetupMessage(refreshed.setupMessage || '')
      setDraft(saved)
      setMessage(adminT('messages.mediaSaved'))
    } catch (saveError) {
      setError(saveError?.message || 'Could not save media item to Supabase.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!draft?.id || !window.confirm(adminT('media.deleteConfirm'))) return
    try {
      if (!hasSupabaseConfig()) {
        throw new Error('Supabase is not configured. Media cannot be deleted online until Supabase is connected.')
      }
      if (!isValidUuid(draft.id)) {
        setError('This item is local-only and cannot be deleted from Supabase.')
        return
      }
      await deleteMediaItem(draft.id)
      const refreshed = await fetchMediaItemsAdminState()
      setItems(refreshed.items)
      setSetupMessage(refreshed.setupMessage || '')
      setDraft(null)
      setMessage(adminT('messages.mediaDeleted'))
    } catch (deleteError) {
      setError(deleteError?.message || 'Could not delete media item.')
    }
  }

  if (loading) return <p className="text-ecaa-ink-muted">{adminT('media.loading')}</p>

  if (draft) {
    return (
      <div className="mx-auto max-w-4xl">
        <button type="button" onClick={() => setDraft(null)} className="text-sm font-medium text-ecaa-green-800">
          {adminT('media.backToList')}
        </button>
        <h1 className="mt-2 text-2xl font-semibold text-ecaa-ink">{adminT('media.editItem')}</h1>

        <AdminSetupNotice message={setupMessage} />

        {message && <p className="mt-4 rounded-lg border border-ecaa-green-200 bg-ecaa-green-50 px-4 py-3 text-sm">{message}</p>}
        {error && <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}

        <form onSubmit={handleSave} className="mt-6 space-y-6">
          <EditorContentTabs value={editorLang} onChange={setEditorLang} />

          {editorLang === 'en' ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormInput id="media-title" label={adminT('forms.title')} value={draft.title} onChange={(e) => updateDraft('title', e.target.value)} required />
                <FormSelect id="media-type" label={adminT('common.type')} value={draft.type} onChange={(e) => updateDraft('type', e.target.value)}>
                  {TYPE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>{adminT(option.labelKey)}</option>
                  ))}
                </FormSelect>
                <FormInput id="media-url" label={adminT('forms.url')} value={draft.url} onChange={(e) => updateDraft('url', e.target.value)} className="sm:col-span-2" />
                <FormInput id="media-image-url" label={adminT('forms.imageUrl')} value={draft.imageUrl} onChange={(e) => updateDraft('imageUrl', e.target.value)} />
                <FormInput id="media-alt" label={adminT('forms.altText')} value={draft.altText} onChange={(e) => updateDraft('altText', e.target.value)} />
                <FormInput
                  id="media-related-event"
                  label={adminT('media.relatedEventId')}
                  value={draft.relatedEventId || ''}
                  onChange={(e) => updateDraft('relatedEventId', e.target.value)}
                  placeholder="Leave blank unless you have a real event UUID"
                />
                <FormInput id="media-category" label={adminT('forms.category')} value={draft.category} onChange={(e) => updateDraft('category', e.target.value)} />
                <FormInput id="media-order" label={adminT('forms.displayOrder')} type="number" value={draft.displayOrder} onChange={(e) => updateDraft('displayOrder', Number(e.target.value))} />
              </div>

              <FormTextarea id="media-caption" label={adminT('forms.caption')} rows={3} value={draft.caption} onChange={(e) => updateDraft('caption', e.target.value)} />

              <ImageUpload
                id="media-upload"
                label={adminT('media.uploadImageFile')}
                uploadFolder={getMediaGalleryUploadFolder(draft.type, draft.category)}
                hint={
                  isLinkBasedMediaType(draft.type)
                    ? adminT('media.uploadHintLink')
                    : adminT('media.uploadHintImage')
                }
                disabled={isLinkBasedMediaType(draft.type)}
                onUploaded={(url) => updateDraft('imageUrl', url)}
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file && !isLinkBasedMediaType(draft.type)) {
                    updateDraft('imageUrl', draft.imageUrl || `/uploads/${file.name}`)
                  }
                }}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <ToggleField id="media-visible" label={adminT('forms.visibleOnWebsite')} checked={draft.visible !== false} onChange={(v) => updateDraft('visible', v)} />
                <ToggleField id="media-featured" label={adminT('forms.featured')} checked={draft.featured === true} onChange={(v) => updateDraft('featured', v)} />
              </div>
            </>
          ) : (
            <>
              <p className="text-sm text-ecaa-ink-muted">{adminT('media.amharicHelper')}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormInput
                  id="media-am-title"
                  label={adminT('media.amharicTitle')}
                  value={draft.content_am?.title || ''}
                  onChange={(e) => updateContentAm('title', e.target.value)}
                />
                <FormInput
                  id="media-am-category"
                  label={adminT('media.amharicCategory')}
                  value={draft.content_am?.category || ''}
                  onChange={(e) => updateContentAm('category', e.target.value)}
                />
                <FormInput
                  id="media-am-alt"
                  label={adminT('media.amharicAltText')}
                  value={draft.content_am?.alt_text || ''}
                  onChange={(e) => updateContentAm('alt_text', e.target.value)}
                  className="sm:col-span-2"
                />
                <FormInput
                  id="media-am-button"
                  label={adminT('media.amharicButtonLabel')}
                  value={draft.content_am?.button_label || ''}
                  onChange={(e) => updateContentAm('button_label', e.target.value)}
                  className="sm:col-span-2"
                />
              </div>
              <FormTextarea
                id="media-am-caption"
                label={adminT('media.amharicCaption')}
                rows={3}
                value={draft.content_am?.caption || ''}
                onChange={(e) => updateContentAm('caption', e.target.value)}
              />
            </>
          )}

          <div className="flex flex-wrap gap-3">
            <SaveButton loading={saving} savingText={adminT('common.saving')}>{adminT('media.saveItem')}</SaveButton>
            {draft.id && isValidUuid(draft.id) && (
              <button type="button" onClick={handleDelete} className="btn btn-secondary btn-sm">
                {adminT('media.deleteItem')}
              </button>
            )}
            <button type="button" onClick={() => setDraft(null)} className="btn btn-ghost btn-sm">
              {adminT('common.cancel')}
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-ecaa-ink">{adminT('media.title')}</h1>
          <p className="mt-1 text-sm text-ecaa-ink-muted">{adminT('media.description')}</p>
        </div>
        <button type="button" onClick={startNew} className="btn btn-primary btn-sm">{adminT('media.addItem')}</button>
      </div>

      <AdminSetupNotice message={setupMessage} />

      <div className="overflow-hidden rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white shadow-ecaa-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-ecaa-cream/60 text-xs uppercase tracking-wide text-ecaa-ink-subtle">
            <tr>
              <th className="px-4 py-3">{adminT('forms.title')}</th>
              <th className="px-4 py-3">{adminT('common.type')}</th>
              <th className="px-4 py-3">{adminT('common.visible')}</th>
              <th className="px-4 py-3">{adminT('common.actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ecaa-border/60">
            {items.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-sm text-ecaa-ink-muted">
                  {adminT('media.emptyList')}
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-3 font-medium text-ecaa-green-950">{item.title}</td>
                  <td className="px-4 py-3">{item.type}</td>
                  <td className="px-4 py-3">
                    <StatusBadge label={item.visible !== false ? adminT('common.visible') : adminT('common.hidden')} variant={item.visible !== false ? 'live' : 'soon'} />
                  </td>
                  <td className="px-4 py-3">
                    <button type="button" onClick={() => startEdit(item)} className="font-semibold text-ecaa-green-800">{adminT('common.edit')}</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
