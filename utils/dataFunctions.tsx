import { supabase } from "./supabase";





// Add a new plan to the database
export const addPlan = async (name: string, percentage: number) => {

  const { data, error } = await supabase
    .from('plans')
    .insert([
      { name, amount: 0, percentage }
    ])
    .select();

  if (error) {
    return { success: false, message: error.message };
  }
  return { success: true, data };
}

// Delete a plan from the database
export async function deletePlan(planId: string){
const { error } = await supabase
  .from('plans')
  .delete()
  .eq('id', planId);

  if (error) {
    return { success: false, message: error.message };
  }
  return { success: true };
}

// Update plan amounts in supabase on every new amount added
export async function updatePlanAmounts(planAmounts: { id: string; newAmount: number }[]) {
try{
  await Promise.all(planAmounts.map(async (plan) => {
    const { data, error } = await supabase
      .from('plans')
      .update({ amount: plan.newAmount })
      .eq('id', plan.id)
      .select()
      .single();

    if (error) {
      return { success: false, message: error.message };
    } else {
      return { success: true, data };
    }
  }
  )); // Wait for all updates to complete
  return { success: true, message: 'All plan amounts updated successfully' };

} catch (error) {
  return { success: false, message: 'Error updating plan amounts: ' + error};
}

}



// Update an existing plan in the database
export async function updatePlan(plan: { id: string; name: string; percentage: string; amount: string; withdraw: string }) {
  const withdrawValue = plan.withdraw && !isNaN(parseFloat(plan.withdraw)) ? parseFloat(plan.withdraw) : 0;
  const newAmount = (parseFloat(plan.amount) - withdrawValue).toString();
  const { data, error } = await supabase
    .from('plans')
    .update({ name: plan.name, percentage: plan.percentage, amount: newAmount})
    .eq('id', plan.id)
    .select()
    .single();

  if (error) {
    return { success: false, message: error.message };
  }
  return { success: true, data };
  
}

// Fetch all plans from the database
export const fetchPlans = async () => {
  const { data, error } = await supabase
    .from('plans')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return { success: false, message: error.message };
  }
  return { success: true, data };
}

// Add a new goal to the database
export const addGoal = async (name: string, targetAmount: number) => {
  const { data, error } = await supabase
    .from('goals')
    .insert([
      { name, current_amount: 0, target_amount: targetAmount }
    ])
    .select();

  if (error) {
    return { success: false, message: error.message };
  }
  return { success: true, data };
}

// Delete a goal from the database
export async function deleteGoal(goalId: string) {
  const { error } = await supabase
    .from('goals')
    .delete()
    .eq('id', goalId);

  if (error) {
    return { success: false, message: error.message };
  }
  return { success: true, message: 'Goal deleted successfully' };
}

// Update goal amounts in supabase when adding money
export async function updateGoalAmounts(goalAmounts: { id: string; newAmount: number }[]) {
  try {
    await Promise.all(goalAmounts.map(async (goal) => {
      const { data, error } = await supabase
        .from('goals')
        .update({ current_amount: goal.newAmount })
        .eq('id', goal.id)
        .select()
        .single();

      if (error) {
        return { success: false, message: error.message };
      } else {
        return { success: true, data };
      }
    })); // Wait for all updates to complete
    return { success: true, message: 'All goal amounts updated successfully' };
  } catch (error) {
    return { success: false, message: 'Error updating goal amounts: ' + error };
  }
}

// Update an existing goal in the database
export async function updateGoal(goal: { id: string; name: string; target_amount: string; current_amount: string; withdraw: string }) {
  const withdrawValue = goal.withdraw && !isNaN(parseFloat(goal.withdraw)) ? parseFloat(goal.withdraw) : 0;
  const newAmount = (parseFloat(goal.current_amount) - withdrawValue).toString();
  const { data, error } = await supabase
    .from('goals')
    .update({ name: goal.name, target_amount: goal.target_amount, current_amount: newAmount })
    .eq('id', goal.id)
    .select()
    .single();

  if (error) {
    return { success: false, message: error.message };
  }
  return { success: true, data };
}

// Fetch all goals from the database
export const fetchGoals = async () => {
  const { data, error } = await supabase
    .from('goals')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return { success: false, message: error.message };
  }
  return { success: true, data };
}












































// async function getUser() {
//   const { data: { user }, error } = await supabase.auth.getUser();
//   if (error) {
//     console.error('Error fetching user:', error);
//     return null;
//   }
//   return user;
// }

