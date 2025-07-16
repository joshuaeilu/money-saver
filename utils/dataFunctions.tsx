import { supabase } from "./supabase";

async function getUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }
  return user;
}

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
  }));
} catch (error) {
  return { errorMessage: 'An error occurred while updating plan amounts.' };
}

}


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

export async function updatePlan(plan: { id: string; name: string; percentage: string; amount: string; withdraw: string }) {
  const newAmount = (parseFloat(plan.amount) - parseFloat(plan.withdraw)).toString();
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



export const addToTotalForUser = async (amount: number) => {
 
  const { data, error } = await supabase
    .from('total')
    .insert([
      { total: amount },
    ])
    .select()

  if (error) {
    return { success: false, message: error.message };
  }
  return { success: true, data };

}

export const addToTotalAmount = async (amount: number) => {
  const user = await getUser();
  if (!user) {
    return { success: false, message: 'User not authenticated' };
  }
  const { total: currentAmount } = await getTotalAmount();

  const { data, error } = await supabase
    .from('total')
    .update({ total: currentAmount + amount })
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) {
    return { success: false, message: error.message };
  }
  return { success: true, message: 'Amount added successfully', data };
}

export const getTotalAmount = async () => {
  const { data, error } = await supabase
    .from('total')
    .select('total')
    .eq('user_id', (await getUser())?.id)
    .single();

  if (error) {
    console.error('Error fetching total amount:', error);
  }
  return { total: data ? data.total : 0 };
}

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


export const fetchPlans = async () => {
  const { data, error } = await supabase
    .from('plans')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching plans:', error.message);
    return [];
  }
  return data;
}
