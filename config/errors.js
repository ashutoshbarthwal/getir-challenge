module.exports = {
  /**
   * sets the default error messages for
   * different type of errors
   *
   * @type {Object}
   */
  messages : {
    application_error: "Something went wrong. Please try again later!",
    forbidden_error: "Forbidden",
    generic_error: "Something went wrong",
    checkout_error: "Checkout Failed. Please try again later",
    model_not_found_error: "Not Found",
    permission_error: "Forbidden",
    token_expired_error: "Token Expired",
    token_required_error: "Token Required",
    transformer_error: "Transformer Not Found",
    unauthorized_error: "Unauthorized",
    invalid_credentials: "Login failed, Please check username and password",
    password_link_invalid: "Password reset link has expired or is invalid.",
    validation_error: "Request contain some non-validated data.",
  }
}
