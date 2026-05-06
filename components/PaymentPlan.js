import React from "react";

const PaymentPlan = ({ plan }) => {
  // Safety check: ensure plan is an array and has at least one item
  if (!plan || !Array.isArray(plan) || plan.length === 0) {
    return <div className="text-gray-600">Payment plan information not available</div>;
  }

  const {
    downPayment,
    preHandoverInstallments,
    handoverPayment,
    postHandoverInstallments,
  } = plan[0] || {};

  return (
    <div className="w-full font-custom2 text-center">
      {/* Down Payment */}
      {downPayment && downPayment.valuePercentage !== null && downPayment.valuePercentage !== undefined && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Down Payment</h3>
          <p className="text-gray-600 text-lg">
            {downPayment.valuePercentage}% on booking
          </p>
        </div>
      )}
      
      {/* Pre-Handover Installments */}
      {preHandoverInstallments && Array.isArray(preHandoverInstallments) && preHandoverInstallments.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Pre-Handover Installments</h3>
          <ul className=" list-inside">
            {preHandoverInstallments.map((installment, index) => (
              <li key={index} className="text-gray-600 text-lg">
                {installment.description || "Pre-handover"} - {installment.valuePercentage}%
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Handover Payment */}
      {handoverPayment && handoverPayment.valuePercentage !== null && handoverPayment.valuePercentage !== undefined && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Handover Payment</h3>
          <p className="text-gray-600 text-lg">
            {handoverPayment.valuePercentage}% at handover
          </p>
        </div>
      )}

      {/* Post-Handover Installments */}
      {postHandoverInstallments && Array.isArray(postHandoverInstallments) && postHandoverInstallments.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold">Post-Handover Installments</h3>
          <ul className=" list-inside">
            {postHandoverInstallments.map((installment, index) => (
              <li key={index} className="text-gray-600 text-lg">
                {installment.description || "Post-handover"} - {installment.valuePercentage}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PaymentPlan;
