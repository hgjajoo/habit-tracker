import { useState } from 'react'
import { Habit } from '@/types/habit'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trash, Edit } from 'lucide-react'

interface HabitItemProps {
  habit: Habit
  deleteHabit: (id: number) => void
  toggleDay: (habitId: number, dayIndex: number) => void
  editHabitName: (id: number, newName: string) => void
}

export default function HabitItem({ habit, deleteHabit, toggleDay, editHabitName }: HabitItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(habit.name)

  const handleEdit = () => {
    if (isEditing) {
      editHabitName(habit.id, editedName)
    }
    setIsEditing(!isEditing)
  }

  const completionRate = habit.days.filter(Boolean).length / 7 * 100

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-2">
        {isEditing ? (
          <Input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="mr-2"
          />
        ) : (
          <h3 className="text-lg font-semibold">{habit.name}</h3>
        )}
        <div>
          <Button variant="ghost" size="icon" onClick={handleEdit}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => deleteHabit(habit.id)}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex justify-between mb-2">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
          <Button
            key={index}
            variant={habit.days[index] ? 'default' : 'outline'}
            className="w-8 h-8 p-0 "
            onClick={() => toggleDay(habit.id, index)}
          >
            {day}
          </Button>
        ))}
      </div>
      <div className="bg-gray-200  h-2 rounded-full">
        <div 
          className="bg-green-500 h-2 rounded-full" 
          style={{ width: `${completionRate}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600  mt-1">
        {completionRate.toFixed(0)}% complete
      </p>
    </div>
  )
}

