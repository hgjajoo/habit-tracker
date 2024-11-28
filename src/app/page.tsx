'use client'

import { useState, useEffect } from 'react'
import HabitList from '@/components/HabitList'
import AddHabitForm from '@/components/AddHabitForm'
import { Habit } from '@/types/habit'

export default function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>(() => {
    if (typeof window !== 'undefined') {
      const savedHabits = localStorage.getItem('habits')
      return savedHabits ? JSON.parse(savedHabits) : []
    }
    return []
  })

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits))
  }, [habits])

  const addHabit = (name: string) => {
    const newHabit: Habit = {
      id: Date.now(),
      name,
      days: Array(7).fill(false),
    }
    setHabits([...habits, newHabit])
  }

  const deleteHabit = (id: number) => {
    setHabits(habits.filter(habit => habit.id !== id))
  }

  const toggleDay = (habitId: number, dayIndex: number) => {
    setHabits(habits.map(habit => 
      habit.id === habitId 
        ? { ...habit, days: habit.days.map((day, index) => index === dayIndex ? !day : day) }
        : habit
    ))
  }

  const editHabitName = (id: number, newName: string) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, name: newName } : habit
    ))
  }

  return (
    <div className={`min-h-screen p-4 'bg-gray-100 text-gray-900`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Habit Tracker</h1>
        </div>
        <AddHabitForm addHabit={addHabit} />
        <HabitList 
          habits={habits} 
          deleteHabit={deleteHabit} 
          toggleDay={toggleDay} 
          editHabitName={editHabitName}
        />
      </div>
    </div>
  )
}

