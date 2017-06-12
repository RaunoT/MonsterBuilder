<!-- Signup (Modal) -->
<div id="Signup" class="modal fade" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title">Sign up</h4>
			</div>
			<div class="modal-body">
				<div class="row">
					<form method="POST" data-toggle="validator" role="form">
						<div class="form-group has-feedback col-sm-12">
							<div class="input-group">
								<span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span>
								<input class="form-control" type="email" name="signupEmail" id="signupEmail" placeholder="Email" data-error="Invalid email address!" required>
								<span class="glyphicon form-control-feedback" aria-hidden="true"></span>
							</div>
							<div class="help-block with-errors"></div>
						</div>
						<div class="form-group has-feedback col-sm-12">
							<div class="input-group">
								<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
								<input class="form-control" type="text" name="userName" id="userName" placeholder="Username" required>
								<span class="glyphicon form-control-feedback" aria-hidden="true"></span>
							</div>
							<div class="help-block with-errors"></div>
						</div>
						<div class="form-group has-feedback col-sm-12">
							<div class="input-group">
								<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
								<input class="form-control" type="password" name="signupPassword" id="signupPassword" placeholder="Password" data-minlength="8" required>
								<span class="glyphicon form-control-feedback" aria-hidden="true"></span>
							</div>
						</div>
						<div class="form-group has-feedback col-sm-12">
							<div class="input-group">
								<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
								<input class="form-control" type="password" id="signupPasswordConfirm" data-match="#signupPassword" data-minlength="8" data-match-error="Passwords don't match" placeholder="Confirm" required>
								<span class="glyphicon form-control-feedback" aria-hidden="true"></span>
							</div>
							<div class="help-block with-errors">Minimum of 8 characters</div>
						</div>
						<div class="form-group col-sm-12">
							<input class="btn" type="submit" value="Sign up">
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>