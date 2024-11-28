import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface AddHabitFormProps {
  addHabit: (name: string) => void
}

export default function AddHabitForm({ addHabit }: AddHabitFormProps) {
  const [habitName, setHabitName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (habitName.trim()) {
      addHabit(habitName.trim())
      setHabitName('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
      <Input
        type="text"
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
        placeholder="Enter a habit"
        className="flex-grow"
      />
      <Button type="submit">Add Habit</Button>
    </form>
  )
}

