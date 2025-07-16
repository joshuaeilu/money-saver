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












































// async function getUser() {
//   const { data: { user }, error } = await supabase.auth.getUser();
//   if (error) {
//     console.error('Error fetching user:', error);
//     return null;
//   }
//   return user;
// }

