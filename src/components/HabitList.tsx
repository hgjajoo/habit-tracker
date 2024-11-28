import { Habit } from '@/types/habit'
import HabitItem from '@/components/HabitItem'

interface HabitListProps {
  habits: Habit[]
  deleteHabit: (id: number) => void
  toggleDay: (habitId: number, dayIndex: number) => void
  editHabitName: (id: number, newName: string) => void
}

export default function HabitList({ habits, deleteHabit, toggleDay, editHabitName }: HabitListProps) {
  return (
    <div className="space-y-4">
      {habits.map(habit => (
        <HabitItem 
          key={habit.id} 
          habit={habit} 
          deleteHabit={deleteHabit} 
          toggleDay={toggleDay}
          editHabitName={editHabitName}
        />
      ))}
    </div>
  )
}

