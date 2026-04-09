import { Clock, Users, Euro } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatCurrency } from '@/utils/currency'

/**
 * CourseCard — grid card for displaying a single course summary.
 *
 * @param {object} props.course - Course data object from the API
 * @param {function} props.onEdit - Callback to open edit modal
 * @param {function} props.onEnroll - Callback to open enrollment modal
 */
export function CourseCard({ course, onEdit, onEnroll }) {
  const statusVariant = course.status === 'active' ? 'success' : 'neutral'
  const statusLabel = course.status === 'active' ? 'Ativo' : 'Inativo'

  return (
    <Card padding="md" className="flex flex-col gap-4">
      {/* Status badge */}
      <div className="flex items-start justify-between gap-2">
        <Badge variant={statusVariant}>{statusLabel}</Badge>
      </div>

      {/* Course name */}
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 leading-snug">
          {course.name}
        </h3>

        {/* Description — capped at 2 lines */}
        {course.description && (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
            {course.description}
          </p>
        )}
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
        {course.duration_hours != null && (
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            {course.duration_hours}h
          </span>
        )}
        {course.max_students != null && (
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            {course.max_students} alunos
          </span>
        )}
        {course.price != null && (
          <span className="flex items-center gap-1">
            <Euro className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            {formatCurrency(course.price)}
          </span>
        )}
      </div>

      {/* Action row */}
      <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800 mt-auto">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(course)}
          aria-label={`Editar curso ${course.name}`}
        >
          Editar
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => onEnroll(course)}
          aria-label={`Inscrever aluno no curso ${course.name}`}
        >
          Inscrever Aluno
        </Button>
      </div>
    </Card>
  )
}
