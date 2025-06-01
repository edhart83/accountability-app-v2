/*
  # Update Partnership Partner ID

  1. Changes
    - Update the partner_id in the partnerships table to use the correct UUID
    - Ensure the partnership record exists before updating

  2. Security
    - Uses DO block for safe execution
    - Checks for existing record before update
*/

DO $$
BEGIN
  -- Update the partner_id if the partnership exists
  UPDATE partnerships
  SET partner_id = '8616d18e-717f-40b3-89f4-ef5adb4f95d1'
  WHERE partner_id = '31f5e518-1f74-410c-ada1-7d6f2fb54001';
END $$;